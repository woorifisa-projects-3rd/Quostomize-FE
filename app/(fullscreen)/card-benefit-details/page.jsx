import BenefitDetailsHeader from "../../../components/cardBenefitDetails/benefit-details-header";
import PointUsageHeader from "../../../components/cardBenefitDetails/point-usage-header";
import PointUsageBody from "../../../components/cardBenefitDetails/point-usage-body";
import BenefitFooter1 from "../../../components/cardBenefitDetails/benefit-details-footer1";
import BenefitFooter2 from "../../../components/cardBenefitDetails/benefit-details-footer2";

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

      <PointUsageHeader />
      <PointUsageBody />
      <BenefitFooter1 />
      <BenefitFooter2 />
      <BenefitChartV1 />
      <BenefitChartV1ColorChange />
      {/* <BenefitChartV2 /> */}
      <BenefitDetailsBody2 />
    </div>
  );
}

export default CardDetailsPage;