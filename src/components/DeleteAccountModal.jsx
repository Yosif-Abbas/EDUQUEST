import { useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import { useCurrentUser } from '../hooks/users/useCurrentUser';
import { useDeleteUser } from '../hooks/users/useDeleteUser';

export default function DeleteAccountModal() {
  const {
    currentUser: { id },
  } = useCurrentUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteAccount, isPending } = useDeleteUser(id);

  return (
    <div>
      <Button variant="danger" className="" onClick={() => setIsModalOpen(true)}>
        Delete Account
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Delete Account">
        <div className="text-xs font-light">
          <p>
            This Account and its reviews and purchased courses will be permenantly deleted,
            This action can&apos;t be undone.
          </p>
          <p>
            <span className="font-medium">Are you sure you want to delete the account?</span>
          </p>
        </div>
        <div className="flex justify-between space-x-2">
          <Button onClick={() => setIsModalOpen(false)} variant="secondary" size="sm">
            Cancel
          </Button>

          <Button onClick={deleteAccount} isLoading={isPending} variant="danger" size="sm">
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
