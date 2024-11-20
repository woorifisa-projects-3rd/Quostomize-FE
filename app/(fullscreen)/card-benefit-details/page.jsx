import BenefitDetailsHeader from "../../../components/cardBenefitDetails/benefit-details-header";
import PointUsageBody from "../../../components/cardBenefitDetails/point-usage-body";
import BenefitFooter2 from "../../../components/cardBenefitDetails/benefit-details-footer2";

const CardDetailsPage = () => {
  return (
    <div>
      <strong>카드 혜택 상세 페이지입니다.</strong>
      <BenefitDetailsHeader />
      <PointUsageBody />
      <BenefitFooter2 />

    </div>
  );
}

export default CardDetailsPage;