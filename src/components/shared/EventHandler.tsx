"use client";
import { useEffect, useState } from "react";

import { listenForNotifications } from "@/lib/fcm";
import { getUnreadCount } from "@/services/notifications/get-unread-count";
import { useDispatch } from "react-redux";
import { setUnReadCount } from "@/redux/notificationsSlice";

const EventHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = listenForNotifications(async (payload) => {
      try {
        const event = payload.data ? payload.data : null;
        if (!event) return;
        await getUnreadCount({
          onSuccess: (data) => {
            dispatch(setUnReadCount(data));
          },
        });
        switch (event.eventName) {
          case "auction_ended":
          case "new_bid_placed":
          case "security_deposit_paid":
            console.log(event);
            break;

          case "rental_request_payment_completed":
            console.log(event);

            break;

          default:
            console.log("Unknown event", event);
        }
      } catch (err) {
        console.error("Error parsing event payload:", err);
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return null;
};

export default EventHandler;
