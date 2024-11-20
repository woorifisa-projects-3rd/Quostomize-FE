import BackButton from '../../../components/button/back-button'

import BenefitDetailsHeader from "../../../components/cardBenefitDetails/benefit-details-header";
import BenefitChartV1 from '../../../components/cardBenefitDetails/benefit-graph-v1'
import BenefitChartV1ColorChange from '../../../components/cardBenefitDetails/benefit-graph-v1-colorchange'
import BenefitChartV2 from '../../../components/cardBenefitDetails/benefit-graph-v2'
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
        <BenefitChartV1 />
        <BenefitChartV1ColorChange />
        {/* <BenefitChartV2 /> */}

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