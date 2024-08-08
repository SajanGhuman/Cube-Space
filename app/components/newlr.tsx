"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import UserProfileModal from "../components/modal/userModal";
import EditUserProfileModal from "./modal/editUserModal";

interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
}

const NewLr = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const modalRef = useRef<HTMLDialogElement>(null);
  const editUserProfileModalRef = useRef<HTMLDialogElement>(null);
  const [refresh, setRefresh] = useState(false); // Add this state

  const fetchUser = async () => {
    if (session?.user?.email) {
      try {
        const response = await fetch(`/api/CRUD/getUser/${session.user.email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const userData = await response.json();
        console.log("Fetched user data:", userData);
        setSelectedUser(userData.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [session]);

  const handleAvatarClick = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  };

  const getInitials = (name: string | null | undefined): string => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase();
  };

  const openUserModal = () => {
    setIsUserModalOpen(true);
    modalRef.current?.showModal();
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    modalRef.current?.close();
  };

  const openEditModal = () => {
    closeUserModal();
    setIsEditModalOpen(true);
    editUserProfileModalRef.current?.showModal();
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    editUserProfileModalRef.current?.close();
    openUserModal();
  };

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
  }, [session, refresh]);

  const saveUser = async (user: User) => {
    try {
      const response = await fetch("/api/CRUD/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();
      setSelectedUser(updatedUser);

      if (session?.user?.email) {
        const refetchResponse = await fetch(
          `/api/CRUD/getUser/${session.user.email}`,
        );
        if (!refetchResponse.ok) {
          throw new Error("Failed to refetch user data");
        }
        const refetchUserData = await refetchResponse.json();
        setSelectedUser(refetchUserData);
      }
      setRefresh(!refresh);
      closeUserModal();
      closeEditModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (status === "loading") {
    return (
      <div
        role="status"
        className="flex justify-center items-center h-screen  w-screen"
      >
        <svg
          aria-hidden="true"
          className="w-[80px] h-[80px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="absolute top-4 right-4">
      {status === "unauthenticated" ? (
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/signIn")}
            className="text-white bg-background-green-dark border-[2px] border-text-green rounded-full mt-2 px-5 h-[50px]"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="text-white bg-background-green-dark border-[2px] border-text-green rounded-full mt-2 px-3 h-[50px]"
          >
            Register
          </button>
        </div>
      ) : (
        <div className="w-[80px] bg-background-green relative left-[25px] top-[-10px]">
          <div
            className="avatar online placeholder"
            onClick={handleAvatarClick}
          >
            <div className="bg-neutral text-neutral-content w-16 rounded-full">
              <span className="text-xl select-none">
                {getInitials(selectedUser ? selectedUser.name : "Loading...")}
              </span>
            </div>
          </div>

          {isModalOpen && (
            <div>
              <ul
                role="menu"
                data-popover="profile-menu"
                data-popover-placement="bottom"
                className="relative right-[100px] top-[1px] z-10 flex min-w-[179px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
              >
                <button
                  role="menuitem"
                  className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10 5C10 5.53043 9.78929 6.03914 9.41421 6.41421C9.03914 6.78929 8.53043 7 8 7C7.46957 7 6.96086 6.78929 6.58579 6.41421C6.21071 6.03914 6 5.53043 6 5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5ZM8 9C7.0426 8.99981 6.10528 9.27449 5.29942 9.7914C4.49356 10.3083 3.85304 11.0457 3.454 11.916C4.01668 12.5706 4.71427 13.0958 5.49894 13.4555C6.28362 13.8152 7.13681 14.0009 8 14C8.86319 14.0009 9.71638 13.8152 10.5011 13.4555C11.2857 13.0958 11.9833 12.5706 12.546 11.916C12.147 11.0457 11.5064 10.3083 10.7006 9.7914C9.89472 9.27449 8.9574 8.99981 8 9Z"
                      fill="#90A4AE"
                    ></path>
                  </svg>
                  <p
                    onClick={openUserModal}
                    className="block font-sans text-sm antialiased font-medium leading-normal text-inherit"
                  >
                    My Profile
                  </p>
                </button>
                <hr className="my-2 border-blue-gray-50" role="menuitem" />
                <button
                  role="menuitem"
                  className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                  onClick={() => signOut({ callbackUrl: "/", redirect: true })}
                >
                  <svg
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                      fill="#90A4AE"
                    ></path>
                  </svg>
                  <p className="block font-sans text-sm antialiased font-medium leading-normal text-black">
                    Sign Out
                  </p>
                </button>
              </ul>
            </div>
          )}
        </div>
      )}
      <UserProfileModal
        ref={modalRef}
        user={selectedUser}
        closeModal={closeUserModal}
        openEditModal={openEditModal}
        refreshTrigger={refresh}
      />

      <EditUserProfileModal
        ref={editUserProfileModalRef}
        user={selectedUser}
        closeModal={closeEditModal}
        saveUser={saveUser}
      />
    </div>
  );
};

export default NewLr;
