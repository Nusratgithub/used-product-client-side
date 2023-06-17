import React from 'react';

const ConfirmationModal = ({ title, message, successButtonName, closeModal, successAction, modalData }) => {
  return (
    <div>
      <input type="checkbox" id="confirmationModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label onClick={closeModal} htmlFor="confirmationModal" className="cursor-pointer bg-green-600 py-1 px-3 text-base text-white font-bold rounded-full">Cancel</label>
            <label onClick={() => successAction(modalData._id)} htmlFor="confirmationModal" className="cursor-pointer bg-red-600 py-1 px-3 text-base text-white font-bold rounded-full">{successButtonName}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;