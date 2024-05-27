import Conversation from "../components/Inbox/Conversation";
import apiService from "../services/apiService";
import React, { useEffect, useState } from "react";
import { getUserId } from "../lib/actions";

export type UserType = {
    id: string;
    name: string;
    avatar_url: string;
};

export type ConversationType = {
    id: string;
    users: UserType[];
};

const InboxPage = async () => {
    const userId = await getUserId();

    if (!userId) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        );
    }

    const conversations = await apiService.get("/api/chat/");

    return (
        <main className="max-w-[1500px] mx-auto px-8 pb-6 space-y-4">
            <h1 className="text-2xl my-6">Inbox</h1>
            {conversations.map((conversation: ConversationType) => (
                <Conversation key={conversation.id} conversation={conversation} userId={userId} />
            ))}
        </main>
    );
};

export default InboxPage;
