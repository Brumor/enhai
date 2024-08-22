import { useState } from "react";
import { AvailableThemes, useCodeEditTheme } from "./providers/CodeEditorThemeProvider"
import { themes } from "prism-react-renderer";

export const ThemeSwitcher = () => {
    const [theme, setTheme] = useCodeEditTheme()

    const [isOpen, openSwitcher] = useState(false)

    const availableThemes = Object.keys(themes) as AvailableThemes[]

    return (
        <sinch-popover
            slot="info"
            open={isOpen}
            aria-label="Select"
            orientation="bottom"
            on-close={() => openSwitcher(false)}
        >
            <sinch-select-button
                slot="target"
                style={{ minWidth: "150px" }}
                text={theme}
                placeholder="Select option"
                aria-label="Open select"
                on-click={() => openSwitcher(true)}
            >
                {theme}
            </sinch-select-button>
            <sinch-select-menu
                slot="content"
                style={{ maxHeight: 300, overflowY: "auto" }}
                aria-label="Action menu"
                value={theme}
                on-change={(e) => setTheme(e.detail as AvailableThemes)}
            >
                {availableThemes.map(theme => <sinch-select-menu-option
                    style={{ minWidth: "150px" }}
                    text={theme}
                    aria-label={theme}
                    value={theme}
                >
                    {theme}
                </sinch-select-menu-option>)}

            </sinch-select-menu>
        </sinch-popover>
    )

}