import React from 'react'

const Button = ({ title, color }) => {
    const baseClasses = "";
    const colorClasses = {
        red: "bg-red-400 hover:bg-red-500",
        green: "bg-green-400 hover:bg-green-500",
        orange: "bg-orange-400 hover:bg-orange-500"
    };

    return (
        <button className={`px-4 py-2 mr-4 rounded-lg font-semibold text-white shadow ${colorClasses[color]}`}>
        {title}
        </button>
    );
};

export default Button;
  