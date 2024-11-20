import BenefitDetailsHeader from "../../../components/cardBenefitDetails/benefit-details-header";
import PointUsageBody from "../../../components/cardBenefitDetails/point-usage-body";

import BenefitDetailsHeader from '../../../components/cardBenefitDetails/benefit-details-header'
import BenefitChartV1 from '../../../components/cardBenefitDetails/benefit-graph-v1'
import BenefitChartV1ColorChange from '../../../components/cardBenefitDetails/benefit-graph-v1-colorchange'
import BenefitChartV2 from '../../../components/cardBenefitDetails/benefit-graph-v2'
import BenefitDetailsBody2 from '../../../components/cardBenefitDetails/benefit-body2'

const CardDetailsPage = () => {
  return (
    <div className='grid place-items-center h-screen'>
      <strong>카드 혜택 상세 페이지입니다.</strong>
      <BenefitDetailsHeader />
      <PointUsageBody />
      <BenefitChartV1 />
      <BenefitChartV1ColorChange />
      {/* <BenefitChartV2 /> */}
      <BenefitDetailsBody2 />
    </div>
  );
}

export default CardDetailsPage;