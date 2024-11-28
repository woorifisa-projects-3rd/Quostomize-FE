import {useEffect, useState} from 'react'
import { Switch } from '@headlessui/react'

function MyToggle({ isEnabled, onToggle, disabled }) {
    const [enabled, setEnabled] = useState(isEnabled);

    useEffect(() => {
        setEnabled(isEnabled);
    }, [isEnabled]);

    const handleToggle = () => {
        if (!disabled) {
            const newState = !enabled;
            setEnabled(newState);
            if (onToggle) {
                onToggle(newState);
            }
        }
    };

    return (
        <Switch
            checked={enabled}
            onChange={handleToggle}
            className={`${enabled ? 'bg-blue-500' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            disabled={disabled}
        >
            <span className="sr-only">Enable notifications</span>
            <span
                className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
        </Switch>
    )
}

export default MyToggle;