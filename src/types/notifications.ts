export type NotificationType =
  | "AUCTION"
  | "ORDER"
  | "PAYMENT"
  | "RENTAL"
  | "RENTAL_REQUEST"
  | "BID"
  | string;

// Auction Events
export type AuctionEvents =
  | "auction_approved"
  | "auction_rejected"
  | "auction_cancelled"
  | "auction_ended";

// Bid Events
export type BidEvents = "security_deposit_paid" | "new_bid_placed";

// Rental Events
export type RentalEvents =
  | "rental_approved"
  | "rental_rejected"
  | "request_created";

// Rental Request Events
export type RentalRequestEvents =
  | "rental_request_created"
  | "rental_request_cancelled"
  | "rental_request_approved"
  | "rental_request_rejected"
  | "rental_request_payment_completed";

// Common Events
export type CommonEvents = "generic_notification";

// Combined Event Name
export type EventName =
  | AuctionEvents
  | BidEvents
  | RentalEvents
  | RentalRequestEvents
  | CommonEvents;

export type NotificationObject = {
  _id: string;
  type: NotificationType;
  eventName: EventName;
  recipientUserId: string;
  title: string;
  body: string;
  isRead: boolean;
  recordId: string;
  createdAt: string;
  updatedAt: string;
  data: Record<string, unknown>;
};
