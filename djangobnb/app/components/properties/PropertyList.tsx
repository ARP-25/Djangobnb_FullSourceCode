"use client";
import { useEffect, useState } from "react";
import React from "react";

import PropertyListItem from "./PropertyListItem";
import { error } from "console";

import { default as axios } from "@/app/utils/axios";

export type PropertyType = {
    id: string;
    name: string;
    price_per_night: number;
    image_url: string;
};

interface PropertyListProps {
    host_id?: string | null;
}

const PropertyList: React.FC<PropertyListProps> = ({ host_id }) => {
    const [properties, setProperties] = useState<PropertyType[]>([]);
    const getProperties = async () => {
        let url = "/api/properties/";
        if (host_id) {
            url = `/api/properties/?host_id=${host_id}`;
        }
        try {
            const tmpProperties = await axios.get(url);
            setProperties(tmpProperties.data);
        } catch (error) {
            console.error("Error fetching properties with axios", error);
        }
    };

    useEffect(() => {
        // fetch properties
        getProperties();
    }, []);

    return (
        <>
            {properties.map((property) => (
                <PropertyListItem key={property.id} property={property} />
            ))}
        </>
    );
};
export default PropertyList;
