import { FC } from "react";

type CopyButtonProps = {
    onClick: () => void
}
export const CopyButton: FC<CopyButtonProps> = ({ onClick }) => {
    return <sinch-tooltip orientation="top" text="Copy code" slot="info">
        <sinch-button
            aria-label="Copy"
            type="secondary"
            on-click={() => onClick()}
        >
            <sinch-icon name="file_copy" slot="icon" />
        </sinch-button>
    </sinch-tooltip>;
};