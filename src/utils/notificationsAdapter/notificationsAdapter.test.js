import { notificationsAdapter } from "./notificationsAdapter";

const mockDocs = [
  {
    id: "1",
    data: jest.fn(() => ({
      title: "Notification 1",
      subTitle: "SubTitle 1",
      isRead: false,
      userId: "user1",
      createdAt: { toDate: jest.fn(() => new Date()) },
    })),
  },
  {
    id: "2",
    data: jest.fn(() => ({
      title: "Notification 2",
      subTitle: "SubTitle 2",
      isRead: true,
      userId: "user2",
      createdAt: { toDate: jest.fn(() => new Date()) },
    })),
  },
];

describe("notificationsAdapter", () => {
  it("should adapt notification documents correctly", () => {
    const adaptedNotifications = notificationsAdapter(mockDocs);

    expect(adaptedNotifications[0]).toEqual({
      id: "1",
      title: "Notification 1",
      subTitle: "SubTitle 1",
      isRead: false,
      userId: "user1",
      createdAt: expect.any(Date),
    });
    expect(adaptedNotifications[1]).toEqual({
      id: "2",
      title: "Notification 2",
      subTitle: "SubTitle 2",
      isRead: true,
      userId: "user2",
      createdAt: expect.any(Date),
    });
  });

  it("should have a length", () => {
    const adaptedNotifications = notificationsAdapter(mockDocs);

    expect(adaptedNotifications).toHaveLength(2);
  });

  it("should return an empty array if notificationDocs is null", () => {
    const adaptedNotificationsNull = notificationsAdapter(null);
    expect(adaptedNotificationsNull).toEqual([]);
  });
});
