"use client"

import SelectPoint1 from '../../../components/create-card/select-point1';
import SelectPoint2 from '../../../components/create-card/select-point2';
import SelectPoint3 from '../../../components/create-card/select-point3';

const CreateCardPage = () => {
  return (
    <div>
      <header>
        <SelectPoint1 />
      </header>
      <SelectPoint2 />
      <SelectPoint3 />
    </div>
  );
}

export default CreateCardPage;