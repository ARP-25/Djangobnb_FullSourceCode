import Image from "next/image";
import ConversationDetail from "@/app/components/Inbox/ConversationDetail";
const ConversationPage = () => {
    return (
        <main className="max-w-[1500px] mx-auto px-8 pb-6 space-y-4">
            <h1 className="text-2xl my-6">ConversationPage</h1>
            <ConversationDetail />
        </main>
    );
};

export default ConversationPage;
