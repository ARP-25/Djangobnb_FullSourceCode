import Image from "next/image";
import ContactButton from "@/app/components/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";
import Conversation from "../components/Inbox/Conversation";

const InboxPage = () => {
    return (
        <main className="max-w-[1500px] mx-auto px-8 pb-6 space-y-4">
            <h1 className="text-2xl my-6">Inbox</h1>
            <Conversation />
            <Conversation />
            <Conversation />
        </main>
    );
};

export default InboxPage;
