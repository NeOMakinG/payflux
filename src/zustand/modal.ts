import { create } from "zustand";

type ModalProps = {
	status: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	props: any;
};

type ModalState = {
	status: Record<string, ModalProps>;
	open: (key: string, props: unknown) => void;
	close: (key: string) => void;
};

export const useModal = create<ModalState>((set) => ({
	status: {},
	open: (key: string, props: unknown) =>
		set((state: ModalState) => ({
			status: { ...state.status, [key]: { status: true, props } },
		})),
	close: (key: string) =>
		set((state: ModalState) => ({
			status: { ...state.status, [key]: { status: false, props: null } },
		})),
}));
