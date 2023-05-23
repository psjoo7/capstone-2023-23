import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//redux
import { deletePlantReducer, setCheckedPlant } from '../store/store';
//redux
import {
  setPlantName,
  setPlantSerialNumber,
  setPlantSpecies,
  setFirstHumidity,
  setFirstSoilMoisture,
  setFirstTemperature,
  setBoothSerialNumber,
} from '../store/store';
import { useDispatch, useSelector } from 'react-redux';

const Title = styled.h4`
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.87);
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 3rem;
`;
const PlainText = styled.p`
  font-size: 1.5rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.1rem;
  color: #234d44;
  font-weight: 400;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
`;

const SelectBtn = styled.button`
  display: block;
  text-align: center;
  align-content: center;
  jusity-content: center;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  width: fit-content;
  padding: 0.5rem 2rem;
`;
const Btn = styled.button`
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  width: fit-content;
  padding: 0.5rem 2rem;
`;
const CustomBtn = styled(Btn)`
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  color: rgb(50, 110, 98);
  width: 100%;
  height: 3.5rem;
  border-radius: 5px;
  border: none;

  background: rgb(50, 110, 98, 0.5);
  color: white;
  font-weight: 700;

  &:hover {
    box-shadow: 0 0 11px rgba(0, 0, 0, 1);
  }
  margin-right: 6rem;

  justify-content: center;
`;
const CustomBtn2 = styled(Btn)`
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  color: rgb(50, 110, 98);
  width: 100%;
  height: 3.5rem;
  border-radius: 5px;
  border: none;

  background: rgb(249, 186, 177);
  color: white;
  font-weight: 700;

  &:hover {
    box-shadow: 0 0 11px rgba(0, 0, 0, 1);
  }
`;
const BtnGroup = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  margin: 1rem;
`;

const DeleteBtn = styled(SelectBtn)`
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  border-radius: 0.5rem;
  border: 3px solid rgb(249, 186, 177);
  background: rgb(249, 186, 177);
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0.3rem 0.5rem 1rem 0.5rem;
  padding-left: 3rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 3rem;
  display: flex;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '10px',
  width: 450,
  bgcolor: 'background.paper',
  border: '10px solid rgb(50,110,98,0.5)',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function DeleteModalPlant(props) {
  const { plant, setPlant } = props;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const deviceId = useSelector(
    (state) => state.boothCookie.boothCookieSerialNumber
  );

  //DB에 부스 이름과 번호를 등록
  const handleSubmit3 = async (event, deviceId) => {
    event.preventDefault();
    try {
      const url = `http://localhost:8080/device/register/plant?deviceId=${deviceId}`;
      const response = await axios.patch(url, {
        deviceId: deviceId,
        humidity: 0,
        soilMoisture: 0,
        temperature: 0,
        plantName: null,
        plantSpecies: null,
      });
      console.log('deletePlant', response);
      dispatch(setBoothSerialNumber(response.data.deviceId));

      dispatch(setPlantName(''));
      dispatch(setPlantSpecies(''));
      dispatch(setFirstHumidity(''));
      dispatch(setFirstSoilMoisture(''));
      dispatch(setFirstTemperature(''));

      setPlant(response.data);

      //add버튼 누를시 rerendering 되도록하기 위한
      // const newPlant = { id: newId, plantName, plantSerialNumber };

      navigate('/Farm/Booth/plantIntro');
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <DeleteBtn onClick={handleOpen}>reset</DeleteBtn>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Title id="modal-modal-title" variant="h5" component="h2">
            Delete my plant
          </Title>
          <PlainText id="modal-modal-description" sx={{ mt: 3 }}>
            Are you sure you want to reset the plant?
          </PlainText>

          <Box
            component="form"
            onSubmit={(event) => handleSubmit3(event, deviceId)}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              marginTop: 4,
            }}
          >
            <CustomBtn
              type="submit"
              variant="contained"
              size="large"
              sx={{
                marginTop: 2,
                marginRight: 15,
                bgcolor: '#7B95B7',
                color: 'white',
                fontSize: 20,
              }}
            >
              OK
            </CustomBtn>
            <CustomBtn2
              variant="contained"
              size="large"
              color="error"
              sx={{
                marginTop: 2,
                bgcolor: '#ea8f8f',
                color: 'white',
                fontSize: 20,
              }}
              onClick={handleClose}
            >
              Cancel
            </CustomBtn2>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
