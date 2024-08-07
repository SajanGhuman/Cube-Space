import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { useSession } from "next-auth/react";

interface EditUserModalProps {
  user: User | null;
  closeModal: () => void;
  saveUser: (user: User) => void;
}

interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
}

const EditUserProfileModal = forwardRef<HTMLDialogElement, EditUserModalProps>(
  ({ user, closeModal, saveUser }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { data: session } = useSession();
    const [editUser, setEditUser] = useState<User | null>(
      user
        ? {
            ...user,
            name: user.name ?? "",
            email: user.email ?? "",
          }
        : null,
    );

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
            setEditUser(userData);
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        }
      };

      fetchUser();
    }, [session]);

    useImperativeHandle(ref, () => dialogRef.current!);

    if (!editUser) return null;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setEditUser((prevUser) =>
        prevUser ? { ...prevUser, [name]: value } : null,
      );
    };

    const handleSubmit = () => {
      if (editUser) {
        saveUser(editUser);
        closeModal();
      }
    };

    const handleBackdropClick = (
      event: React.MouseEvent<HTMLDialogElement>,
    ) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    };

    return (
      <dialog ref={dialogRef} className="modal" onClick={handleBackdropClick}>
        <div className="modal-box bg-white z-50 p-4">
          <h3 className="font-bold text-lg">Edit Profile</h3>
          <form className="mt-4 space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={editUser.name}
                onChange={handleInputChange}
                className="input input-bordered bg-text-green text-white"
              />
            </div>
          </form>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSubmit}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-text-green hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Save
            </button>
            <button
              onClick={closeModal}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    );
  },
);

EditUserProfileModal.displayName = "EditUserProfileModal";
export default EditUserProfileModal;
