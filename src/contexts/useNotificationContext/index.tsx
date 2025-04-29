import { createContext, useContext, useState } from "react";
import { IProviderProps } from "../../entities/IProviderProps";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useQuery } from "@tanstack/react-query";
import { services } from "../../services";
import { useAuthenticationContext } from "../useAuthenticationContext";
import { auth } from "../../config/firebase";
import { INotificationResponse } from "../../entities/INotificationResponse";
import { INotificationState } from "../../entities/INotificationState";
import { INotificationTag } from "../../entities/INotificationTag";
import { SERVICES_LIMITS } from "../../config/services";
import { getLimit } from "../../utils/getLimit";
import { INotificationStateKey } from "../../entities/INotificationStateKey";
import { INotificationStateKeyValue } from "../../entities/INotificationStateKeyValue";
import { decideScreenStateToRender } from "../../utils/decideScreenStateToRender";
import { calculateNumberOfPages } from "../../utils/calculateNumberOfPages";
import { formatTitleWithCount } from "../../utils/formatTitleWithCount";
import { IRenderOptionsOutput } from "../../entities/IRenderOptionsOutput";
import { INotification } from "../../entities/INotification";

const INIITAL_DATA: INotificationResponse = {
  count: 0,
  results: [],
};

const TAGS: INotificationTag[] = ["All", "Unread", "Read"];

const INITIAL_STATE: INotificationState = {
  currentPage: 1,
  isLoading: false,
  source: "All",
};

const NotificationsContext = createContext({} as INotificationContext);

export const NotificationsProvider = ({ children }: IProviderProps) => {
  const { state: authState } = useAuthenticationContext();
  const toast = useCustomToast();

  const [state, setState] = useState<INotificationState>(INITIAL_STATE);

  const LIMIT = SERVICES_LIMITS.EXPANDED_LIMIT;

  const { data, isFetching, refetch } = useQuery(
    ["/notifications", state.source, LIMIT, state.currentPage],
    async () => {
      const data = await services.get.notifications({
        userId: auth?.currentUser?.uid,
        source: state.source,
        currentPage: state.currentPage,
        limit: getLimit(LIMIT, state.currentPage),
      });

      return data;
    },
    {
      enabled: authState?.isAuthenticated,
      onError: (e) => {
        toast.errorToast("Failed to load your notifications");
      },
      onSuccess: () => {
        console.log("SUCCESS", "Loaded your notifications successfully");
      },
      initialData: INIITAL_DATA,
      refetchOnWindowFocus: false,
      refetchInterval: 15000,
    }
  );

  // STATE METHODS
  const _handleSetLoading = (bool: boolean) => {
    setState((prev) => ({ ...prev, isLoading: bool }));
  };

  const handleOnChange = (
    key: INotificationStateKey,
    value: INotificationStateKeyValue
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));

    if (key === "source")
      return setState((prev) => ({ ...prev, currentPage: 1 }));
  };

  // ACTION METHODS
  const handleOnRemoveNotification = async (notificationId: string) => {
    try {
      _handleSetLoading(true);

      await services.delete.notification({
        id: notificationId,
      });

      toast.successToast(`Successfuly removed the notification`);
    } catch (e: any) {
      console.log("ERROR", e);
      toast.errorToast(`Unable to remove the notification. Try again later`);
    } finally {
      _handleSetLoading(false);
      refetch();
    }
  };

  const handleOnMarkAsReadOrUnreadNotification = async (
    notificationId: string,
    isRead: boolean
  ) => {
    try {
      _handleSetLoading(true);

      await services.update.notification({
        id: notificationId,
        isRead: !isRead,
      });

      toast.successToast(`Successfuly updated the notification`);
    } catch (e: any) {
      console.log("ERROR", e);
      const messageTag = isRead ? "unread" : "read";
      toast.errorToast(
        `Unable to mark the notification as ${messageTag}. Try again later`
      );
    } finally {
      _handleSetLoading(false);
      refetch();
    }
  };

  const isInvalidSearch = state.source !== "All" && !data.count;

  const screenState = decideScreenStateToRender({
    isFetching: isFetching,
    isInvalidSearch: isInvalidSearch,
    entriesLength: data.results.length,
  });

  const notifications = data?.results || [];
  const notificationCount = data?.count || 0;
  const totalPages = calculateNumberOfPages(notificationCount);

  return (
    <NotificationsContext.Provider
      value={{
        state: {
          title: formatTitleWithCount("Notifications", notificationCount),
          activeSource: state?.source,
          isFetching: isFetching,
          screenState: screenState,
          isLoading: state?.isLoading,
          currentPage: state?.currentPage,
          count: notificationCount,
          totalPages: totalPages,
          limit: LIMIT,
          notifications: notifications,
          tagList: TAGS,
        },
        methods: {
          handleOnDelete: handleOnRemoveNotification,
          handleOnRead: handleOnMarkAsReadOrUnreadNotification,
          handleOnChange: handleOnChange,
        },
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => {
  return useContext(NotificationsContext);
};

interface INotificationContext {
  state: {
    title: string;
    activeSource: INotificationTag;
    currentPage: number;
    isFetching: boolean;
    screenState: IRenderOptionsOutput;
    isLoading: boolean;
    count: number;
    totalPages: number;
    limit: number;
    notifications: INotification[];
    tagList: string[];
  };
  methods: {
    handleOnRead: (id: string, isRead: boolean) => void;
    handleOnDelete: (id: string) => void;
    handleOnChange: (
      key: INotificationStateKey,
      value: INotificationStateKeyValue
    ) => void;
  };
}
