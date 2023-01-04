export interface Comments {
  _id: string;
  comment: string;
  messageId: string;
  createdBy: {
    _id: string;
    userName: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  isReply: boolean;
  replies: [
    {
      _id: string;
      comment: string;
      createdBy: {
        _id: string;
        userName: string;
        firstName: string;
        lastName: string;
      };
      createdAt: string;
      isReply: boolean;
    }
  ];
}

export interface CommentResponse {
  status: string;
  data: Comments[];
}
