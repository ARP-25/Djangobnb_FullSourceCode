import Image from "next/image";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {
    const property = await apiService.get(`/api/properties/${params.id}`);
    const userId = await getUserId();
    return (
        <main className="max-w-[1500px] mx-auto px-8 pb-6">
            <div className="w-full h-[64vh] overflow-hidden rounded-xl relative mb-4">
                <Image src={property.image_url} fill alt="Villa" className="object-cover " />
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="col-span-3 py-6 pr-6">
                    <h1 className="mb-4 text-4xl">{property.name}</h1>
                    <span className="mb-6 block text-lg text-gray-600">
                        {property.guests} Guests - {property.bedrooms} Bedrooms - {property.bathrooms} Bathroom
                    </span>
                    <hr />
                    <div className="py-6 flex items-center space-x-4">
                        {property.host.avatar_url && (
                            <Image
                                src={property.host.avatar_url}
                                alt="User Avatar"
                                width={60}
                                height={60}
                                className="rounded-full object-cover w-[55px] h-[55px]"
                            />
                        )}
                        <p>
                            <strong>{property.host.name}</strong> is your host
                        </p>
                    </div>
                    <hr />
                    <p className="mt-6 text-lg">{property.description}</p>
                </div>

                <ReservationSidebar property={property} userId={userId} />
            </div>
        </main>
    );
};

export default PropertyDetailPage;
