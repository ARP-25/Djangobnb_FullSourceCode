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

const PropertyList = () => {
    const [properties, setProperties] = useState<PropertyType[]>([]);
    const [properties2, setProperties2] = useState<PropertyType[]>([]);

    const getProperties = async () => {
        const url = "/api/properties/";
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
