import React, { forwardRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface UserModalProps {
  closeModal: () => void;
  openEditModal: () => void;
  refreshTrigger: boolean; // Add this prop
}

interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
}

const UserProfileModal = forwardRef<HTMLDialogElement, UserModalProps>(
  ({ closeModal, openEditModal, refreshTrigger }, ref) => {
    const { data: session } = useSession();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
      const fetchUser = async () => {
        if (session?.user?.email) {
          try {
            const response = await fetch(
              `/api/CRUD/getUser/${session.user.email}`,
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch user: ${response.statusText}`);
            }
            const userData = await response.json();
            setSelectedUser(userData);
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        }
      };

      fetchUser();
    }, [session, refreshTrigger]);

    const getInitials = (name: string | null | undefined): string => {
      if (!name) return "";
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    };

    return (
      <dialog ref={ref} className="modal" aria-labelledby="user-profile-modal">
        <div className="modal-box bg-white z-50 p-4 relative">
          <div className="flex flex-col items-center">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-24 rounded-full">
                <span className="text-3xl">
                  {selectedUser ? getInitials(selectedUser.name) : "Loading..."}
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 relative left-3">
              <h3 className="font-bold text-lg mt-2">
                {selectedUser ? selectedUser.name : "Loading..."}
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
                onClick={openEditModal}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                <path d="M16 5l3 3" />
              </svg>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-3">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="font-medium text-gray-600">
                  <strong>Email</strong>
                </dt>
                <dd className="mt-1 ml-3 text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedUser ? selectedUser.email : "Loading..."}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          className="modal-backdrop bg-black bg-opacity-50 fixed inset-0 z-40"
          onClick={closeModal}
          role="button"
          aria-label="Close modal"
        ></div>
      </dialog>
    );
  },
);

UserProfileModal.displayName = "UserProfileModal";
export default UserProfileModal;
