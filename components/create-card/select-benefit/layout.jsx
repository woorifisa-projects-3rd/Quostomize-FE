import { BenefitProvider } from '../context/BenefitContext';

export default function CreateCardLayout({ children }) {
    return <BenefitProvider>{children}</BenefitProvider>;
}