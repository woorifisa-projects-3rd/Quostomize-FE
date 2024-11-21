import FlipCard from '../../../../components/card/flip-card'

const CreateCardPage = () => {
  return (
    <div className='flex center'>
      카드 생성 페이지
      <FlipCard frontImg="/cards-images/1f.png" backImg="/cards-images/1b.png" />
    </div>
  );
}


export default CreateCardPage;