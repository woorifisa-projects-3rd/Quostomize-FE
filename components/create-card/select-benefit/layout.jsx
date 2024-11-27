import { BenefitProvider } from './BenefitContext';

export default function CreateCardLayout({ children }) {
    return <BenefitProvider>{children}</BenefitProvider>;
}