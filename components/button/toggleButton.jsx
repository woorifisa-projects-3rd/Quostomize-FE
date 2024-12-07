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
                } relative inline-flex h-8 w-16 items-center rounded-full`}
            disabled={disabled}
        >
            <span className="sr-only">Enable notifications</span>
            <span
                className={`${enabled ? 'translate-x-10' : 'translate-x-2'
                    } inline-block h-5 w-5 transform rounded-full bg-white transition`}
            />
        </Switch>
    )
}

export default MyToggle;