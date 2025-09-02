import { Dropdown, Badge, List, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { svgs } from "../icons/svgs";
import { type NotificationObject } from "@/types/notifications";
import { getUnreadCount } from "@/services/notifications/get-unread-count";
import { getMyNotifications } from "@/services/notifications/get-my-notifications";
import { formatNotificationDate } from "@/utils/formatNotificationDate";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { markAsRead } from "@/services/notifications/mark-as-read";
import { setUnReadCount } from "@/redux/notificationsSlice";
import { markAllAsRead } from "@/services/notifications/mark-all-as-read";

const NotificationDropdown: React.FC = () => {
  const limit = 30;
  const { unReadCount } = useSelector(
    (state: RootState) => state.notifications,
  );
  // const [unreadCount, setUnReadCount] = useState<number>();
  const [notificationsList, setNotificationsList] = useState<
    NotificationObject[]
  >([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalDocs, setTotalDocs] = useState<number>();
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   // const getUnreadCountNotifications = async () => {
  //   //   await getUnreadCount({
  //   //     onSuccess: (data) => {
  //   //       setUnReadCount(data);
  //   //     },
  //   //   });
  //   // };
  //   notificationCount();
  //   // getUnreadCountNotifications();
  // }, []);

  const fetchNotifications = async (pageNumber: number) => {
    if (loading) return;
    setLoading(true);

    await getMyNotifications({
      page: pageNumber,
      limit,
      onSuccess: (data) => {
        if (pageNumber === 1) {
          setNotificationsList(data.docs);
        } else {
          setNotificationsList((prev) => [...prev, ...data.docs]);
        }
        setTotalPages(data.totalPages);
        setPage(data.page);
        setLoading(false);
      },
      onError: () => setLoading(false),
    });
  };

  const handleClickNotification = async () => {
    fetchNotifications(1);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (
      scrollTop + clientHeight >= scrollHeight - 50 &&
      page < totalPages &&
      !loading
    ) {
      fetchNotifications(page + 1);
    }
  };

  const handleClickItem = async (item: NotificationObject) => {
    await markAsRead({
      notificationId: item._id,
      onSuccess: (data) => {
        setNotificationsList((prev) =>
          prev.map((notification) =>
            notification._id === item._id
              ? { ...notification, isRead: true }
              : notification,
          ),
        );
        if (unReadCount > 0) {
          dispatch(setUnReadCount(unReadCount - 1));
        }

        setOpen(false);
        // Navigate to specific page
        switch (item.eventName) {
          case "auction_approved":
          case "auction_rejected":
          case "auction_cancelled":
          case "auction_ended":
          case "new_bid_placed":
          case "security_deposit_paid":
            // router.push(`/products/?tab=auction`);
            router.push(`/products/auction/?auction=${item.recordId}`);
            break;

          case "request_created":
          case "rental_rejected":
          case "rental_approved":
          case "rental_request_created":
          case "rental_request_cancelled":
          case "rental_request_approved":
          case "rental_request_rejected":
          case "rental_request_payment_completed":
            router.push(`/products/rental/?id=${item.data.rentalId}`);
            break;
        }
      },
    });
  };

  const handleClickMarkAllAsRead = async () => {
    await markAllAsRead({
      onSuccess: async () => {
        await getUnreadCount({
          onSuccess: (data) => {
            dispatch(setUnReadCount(data));
          },
        });
        setOpen(false);
      },
    });
  };

  const content = (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="max-h-[70vh] w-[440px] overflow-y-auto rounded bg-white shadow-[0_5px_15px_0_#00000033]"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3">
        <div className="flex w-full flex-[1] cursor-pointer items-center gap-2">
          <span className="text-sm font-medium text-[#1A1F36]">
            Notifications
          </span>
          <div className="flex w-[56px] items-center justify-between">
            <span className="text-xs font-medium text-[#9EA0AA]"> All</span>
            <span>{svgs.allArrow}</span>
          </div>
        </div>
        <Button
          size="small"
          className="border-none shadow-none outline-none"
          onClick={handleClickMarkAllAsRead}
        >
          <span className="text-sm text-[#1A1F36]">Mark all as read</span>
          <span>{svgs.asRead}</span>
        </Button>
      </div>

      <List
        dataSource={notificationsList}
        renderItem={(item) => (
          <List.Item className="px-4 py-3 transition hover:bg-[#700C180A]">
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleClickItem(item);
              }}
              className="flex w-full cursor-pointer flex-col px-4 py-3"
            >
              {item.isRead === false && (
                <span className="h-2 w-2 rounded-full border border-[#4299E1] bg-[#90CDF4]" />
              )}
              <div className="ml-1 mt-1 flex gap-4">
                <span>{svgs.unread}</span>
                <div className="flex flex-col items-start gap-2">
                  <span className="text-sm font-semibold text-[#1A1F36]">
                    {item.title}
                  </span>
                  {/* {item.actionLabel && (
                    <Button
                      type="primary"
                      size="small"
                      className="mt-2 w-fit"
                      onClick={item.onActionClick}
                    >
                      {item.actionLabel}
                    </Button>
                  )} */}
                  <span className="line-clamp-3 text-sm font-medium text-[#1A1F36]">
                    “{item.body}”
                  </span>
                  <span className="text-sm font-medium text-[#A5ACB8]">
                    {formatNotificationDate(item.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <Dropdown
      overlay={content}
      trigger={["click"]}
      placement="bottom"
      align={{ offset: [-50, 30] }}
      open={open}
      onOpenChange={setOpen}
    >
      <Badge
        count={unReadCount}
        className="cursor-pointer"
        onClick={handleClickNotification}
      >
        <span>{svgs.notification}</span>
      </Badge>
    </Dropdown>
  );
};

export default NotificationDropdown;
