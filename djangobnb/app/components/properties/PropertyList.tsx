"use client";
import { useEffect, useState } from "react";
import React from "react";

import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";

//
// Type for the Property object used to set the property state which gets passed to the PropertyListItem component
export type PropertyType = {
    id: string;
    name: string;
    price_per_night: number;
    image_url: string;
    is_favorite: boolean;
};

//
// Interface for the PropertyList component
interface PropertyListProps {
    host_id?: string | null;
    favorites?: boolean | null;
}

const PropertyList: React.FC<PropertyListProps> = ({ host_id, favorites }) => {
    //
    // State to store the properties
    const [properties, setProperties] = useState<PropertyType[]>([]);

    //
    // Function to mark a property as favorite
    // Gets passed to the PropertyListItem component
    const markFavorite = (id: string, is_favorite: boolean) => {
        const tmpProperties = properties.map((property: PropertyType) => {
            if (property.id === id) {
                property.is_favorite = is_favorite;
                if (is_favorite) {
                    console.log("Added to favorites");
                } else {
                    console.log("Removed from favorites");
                }
            }
            return property;
        });
        setProperties(tmpProperties);
    };

    //
    // Function to fetch properties from the API
    const getProperties = async () => {
        let url = "/api/properties/";
        if (host_id) {
            url = `/api/properties/?host_id=${host_id}`;
        } else if (favorites) {
            url = "/api/properties/?is_favorites=true";
        }
        try {
            const response = await apiService.get(url);
            console.log("Full response:", response);

            const { data, favorites } = response;
            if (Array.isArray(data)) {
                const propertiesWithFavorites = data.map((property: any) => ({
                    ...property,
                    is_favorite: favorites.includes(property.id),
                }));
                console.log("Processed properties:", propertiesWithFavorites);
                setProperties(propertiesWithFavorites);
            } else {
                console.error("Fetched data is not an array", response);
            }
        } catch (error) {
            console.error("Error fetching properties with axios", error);
        }
    };

    //
    // Fetch properties when the component mounts
    useEffect(() => {
        getProperties();
    }, [host_id]);

    return (
        <>
            {properties.map((property) => (
                <PropertyListItem key={property.id} property={property} markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)} />
            ))}
        </>
    );
};

export default PropertyList;
