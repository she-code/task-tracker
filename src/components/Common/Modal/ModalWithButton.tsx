import { Transition, Dialog } from "@headlessui/react";
import {
  ReactNode,
  RefObject,
  useState,
  useEffect,
  Fragment,
  CSSProperties,
} from "react";
export default function ModalWithButton(props: {
  children: ReactNode;
  open: boolean;
  closeCB: () => void;
  triggerRef: RefObject<any>;
}) {
  const { children, open, closeCB, triggerRef } = props;

  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      setModalPosition({
        top: triggerRect.top,
        left: triggerRect.left + triggerRect.width + 10, // Adjust the offset as needed
      });
    }
  }, [triggerRef]);

  const modalStyle: CSSProperties = {
    position: "fixed",
    top: modalPosition.top,
    left: modalPosition.left,
  };

  return (
    <Transition.Root show={open}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        style={modalStyle}
        onClose={closeCB}
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative bg-white rounded-lg max-w-sm mx-auto">
              <button
                className="absolute top-0 right-0 m-3 p-1 bg-gray-300 rounded-full hover:bg-gray-400"
                onClick={closeCB}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="p-4">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
