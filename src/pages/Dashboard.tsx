import { PatientForm } from "@/features/patient/components/PatientForm";
import { useModal } from "@/hooks/useModal";

export function Dashboard() {
  const { ref, show, close } = useModal();

  return (
    <main>
      <button className="btn" onClick={show}>
        Open
      </button>
      <dialog className="modal" ref={ref}>
        <div className="modal-box">
          <PatientForm closeModal={close} />
        </div>
      </dialog>
    </main>
  );
}
