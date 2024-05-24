interface CustomButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, className }) => {
    return (
        <div className="flex justify-center">
            <div
                onClick={onClick}
                className={`w-full py-4 bg-airbnb hover:bg-airbnbDark text-white trainsition rounded-xl cursor-pointer text-center ${className}`}
            >
                {label}
            </div>
        </div>
    );
};

export default CustomButton;
