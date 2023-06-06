import { Link } from "raviger";
import React, { useState, useRef, useEffect } from "react";

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="text-gray-800 focus:outline-none"
        onClick={toggleDropdown}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10"
        >
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg flex flex-col  z-10 text-black">
            <Link
              href={`/boards`}
              className="  px-4 py-2 text-lg font-normal  text-center hover:bg-neutral-100 w-full"
            >
              View
            </Link>
            <button
              // onClick={(_) => setShowEditModal(true)}
              className="hover:bg-neutral-100 w-full px-4 py-2 text-lg font-normal "
            >
              Edit
            </button>
            <button
              className=" px-4 py-2 text-lg font-normal text-center  hover:bg-neutral-100 w-full "
              // onClick={(_) => handleDeleteBoard(id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
