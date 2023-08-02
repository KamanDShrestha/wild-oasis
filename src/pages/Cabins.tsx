import React, { useEffect, useState } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { getCabins } from '../services/apiCabins';
import CabinTable from '../features/cabins/CabinTable';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

function Cabins() {
  //use State for showing the form
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>

      <Row>
        <CabinTable />
      </Row>
      <Button
        variation='primary'
        size='medium'
        onClick={() => setShowForm((showForm) => !showForm)}
      >
        Add Cabin
      </Button>
      {showForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
