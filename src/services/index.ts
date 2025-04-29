import { deleteAccount } from "./composition-delete-account";
import { compositionResourceLike } from "./composition-resource-like";
import { compositionResources } from "./composition-resources";
import { compositionUser } from "./composition-user";
import { deleteNotification } from "./delete-notification";
import { deleteSymptomResourceLike } from "./delete-resource-like";
import { deleteSymptomScores } from "./delete-symptom-scores";
import { deleteTrackedSymptom } from "./delete-tracked-symptom";
import { getFavouriteResources } from "./get-favourite-resources";
import { getFile } from "./get-file";
import { getNotifications } from "./get-notifications";
import { getResourceCategories } from "./get-resource-categories";
import { getResourceLikes } from "./get-resource-likes";
import { getResourceTypes } from "./get-resource-types";
import { getResources } from "./get-resources";
import { getSymptomScores } from "./get-symptom-scores";
import { getSymptoms } from "./get-symptoms";
import { getTrackedSymptoms } from "./get-tracked-symptoms";
import { getUser } from "./get-user";
import { getUsers } from "./get-users";
import { postAuthForgotPassword } from "./post-auth-forgot-password";
import { postAuthGoogleLogin } from "./post-auth-google-login";
import { postAuthLogin } from "./post-auth-login";
import { postAuthLogout } from "./post-auth-logout";
import { postAuthRegistration } from "./post-auth-registration";
import { postNotification } from "./post-notification";
import { postSymptomResourceLike } from "./post-symptom-resource-like";
import { postSymptomScore } from "./post-symptom-score";
import { postTrackedSymptom } from "./post-tracked-symptom";
import { updateAuth } from "./update-auth";
import { updateNotification } from "./update-notification";
import { updateTrackedSymptom } from "./update-tracked-symptom";
import { updateUser } from "./update-user";

export const services = {
  post: {
    authLogin: postAuthLogin,
    authLogout: postAuthLogout,
    authRegistration: postAuthRegistration,
    authForgotPassword: postAuthForgotPassword,
    trackedSymptom: postTrackedSymptom,
    score: postSymptomScore,
    resourceLike: postSymptomResourceLike,
    notification: postNotification,
    authLoginWithGoogle: postAuthGoogleLogin,
  },
  get: {
    symptoms: getSymptoms,
    trackedSymptoms: getTrackedSymptoms,
    scores: getSymptomScores,
    likes: getResourceLikes,
    users: getUsers,
    user: getUser,
    resources: getResources,
    types: getResourceTypes,
    categories: getResourceCategories,
    notifications: getNotifications,
    favouriteResources: getFavouriteResources,
    file: getFile,
  },
  delete: {
    trackedSymptom: deleteTrackedSymptom,
    scores: deleteSymptomScores,
    resourceLike: deleteSymptomResourceLike,
    notification: deleteNotification,
    account: deleteAccount,
  },
  update: {
    trackedSymptom: updateTrackedSymptom,
    user: updateUser,
    auth: updateAuth,
    notification: updateNotification,
  },
  composition: {
    resourceLike: compositionResourceLike,
    resources: compositionResources,
    user: compositionUser,
  },
};
