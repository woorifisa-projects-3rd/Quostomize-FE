import BackButton from '../../../components/button/back-button'

import BenefitDetailsHeader from "../../../components/cardBenefitDetails/benefit-details-header";
import BenefitGraphData from "../../../components/cardBenefitDetails/benefit-graph-data"
import BenefitDetailsBody1 from '../../../components/cardBenefitDetails/benefit-details-body1'
import BenefitDetailsBody2 from '../../../components/cardBenefitDetails/benefit-details-body2'
import PointUsageHeader from "../../../components/cardBenefitDetails/point-usage-header";
import PointUsageBody from "../../../components/cardBenefitDetails/point-usage-body";
import BenefitFooter1 from "../../../components/cardBenefitDetails/benefit-details-footer1";
import BenefitFooter2 from "../../../components/cardBenefitDetails/benefit-details-footer2";

const CardDetailsPage = ({ children }) => {
  return (
    <div className='relative h-screen'>
      <BackButton children={"카드 소개로 돌아가기"} />

      <div className='grid place-items-center'>
        <BenefitDetailsHeader />
        <BenefitGraphData />

        <BenefitDetailsBody1 />
        <BenefitDetailsBody2 />

        <PointUsageHeader />
        <PointUsageBody />

        <BenefitFooter1 />
        <BenefitFooter2 />
      </div>
    </div>
  );
}

export default CardDetailsPage;