import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';
import type { ClampDisplayProps } from './ClampDisplay';
import SavedClampDisplay from './SavedClampDisplay';
import DeleteModal from './DeleteModal';

type LocalDataViewModalProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LocalDataViewModal({
  setModal,
}: LocalDataViewModalProps) {
  const [savedData, setSavedData] = useState<ClampDisplayProps[]>(
    () => JSON.parse(localStorage.getItem('saved-clamps') as string) || [],
  );

  const [deleting, setDeleting] = useState<string | null>(null);

  return (
    <motion.div
      onMouseDown={() => setModal(false)}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 z-50 grid place-items-center overflow-x-hidden overflow-y-auto bg-black/30 p-4"
    >
      <motion.div
        onMouseDown={(e) => e.stopPropagation()}
        initial={{
          scale: 1.2,
        }}
        animate={{
          scale: 1,
        }}
        exit={{
          scale: 0.8,
          opacity: 0,
        }}
        className="w-full max-w-[650px] rounded-xl bg-white p-4 shadow-md"
      >
        <h3 className="mb-2 text-xl font-medium">Saved clamps</h3>
        {savedData.length > 0 ? (
          <div className="grid max-h-[345px] overflow-y-auto gap-2 pr-1">
            {savedData.map((d) => (
              <SavedClampDisplay
                key={d.prefix + d.content + d.suffix}
                clampData={d}
                setDeleting={setDeleting}
              />
            ))}
          </div>
        ) : (
          <div>
            <p className="">No saved clamps found!</p>
          </div>
        )}
        <AnimatePresence>
          {deleting && (
            <DeleteModal
              setSavedData={setSavedData}
              setDeleting={setDeleting}
              content={deleting}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
