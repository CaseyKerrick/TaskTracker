import React, { useState, useEffect } from 'react';
import { InputAdornment, TextField, List, ListItem, Button } from '@mui/material';
import './PostageCalculator.css';

function PostageCalculator() {

  const generateSolutions = () => {
    const integerDenominations = stampDenominations.split(',').map((item: string) => Number.parseInt(item));
    let sols = [];
    
    for (let x = stampDenominations.length - 1; x >= 0; x--) {
      const current = integerDenominations[x];
      if (current < postageCost) {
        const sol = generateIndividualSolution([current], postageCost - current, integerDenominations.slice(0, x + 2));
        if (sol.length > 0) {
          sols.push(sol.sort((a: number, b: number) => a - b));
        }
      } else if (current === postageCost) {
        sols.push([current]);
      }
    }

    console.log(sols);
    setSolutions(sols);
  };

  const generateIndividualSolution = (stamps: number[], remainingAmount: number, remainingStamps: number[]) => {
    if (remainingAmount === 0) {
      return stamps;
    } else if (remainingAmount < remainingStamps[0]) {
      return [];
    } else if (stamps.length >= 4) {
      return [];
    }

    let tempSolutions: any[] = [];
    for (let x = remainingStamps.length - 1; x >= 0; x--) {
      const current = remainingStamps[x];
      if (current > remainingAmount) {
        continue;
      }

      const sol = generateIndividualSolution([current, ...stamps], remainingAmount - current, remainingStamps.splice(0, x + 2));
      if (sol.length > 0) {
        tempSolutions = [...tempSolutions, ...sol];
      }
    }

    return tempSolutions;
  };

  const drawStamps = (stamps: number[]) => {
    return (
      <div>
        { stamps.map((stamp: number, index: number) =>
          (<div key={'' + stamp + index} className="stamp">{stamp}</div>)
        )}
      </div>
    );
  };

  // const setDenominations = (rawDenominations: string) => {
  //   const integerStoredDenominations = rawDenominations.split(',').map((item: string) => Number.parseInt(item));
  //   setStampDenominations(integerStoredDenominations);
  // };

  const [stampDenominations, setStampDenominations] = useState('');
  const [postageCost, setPostageCost] = useState(51);
  const [maxStamps, setMaxStamps] = useState(4);
  const [solutions, setSolutions] = useState(new Array());

  useEffect(() => {
    const defaultStampDenominations = [4, 5, 10, 18, 20, 22, 24, 29, 33, 34, 50, 51, 66, 87, 100, 111];
    const storedDenominations = localStorage.getItem('stampDenominations');
    
    if (!storedDenominations || storedDenominations.length <= 0) {
      localStorage.setItem('stampDenominations', defaultStampDenominations.toString());
      setStampDenominations(defaultStampDenominations.toString());
    } else {
    //   const integerStoredDenominations = storedDenominations.split(',').map((item: string) => Number.parseInt(item));
    // setStampDenominations(integerStoredDenominations);
      setStampDenominations(storedDenominations);
    }
  }, [setStampDenominations]);

  return (
    <div className='mainList'>
      <div className='dataEntry'>
        <TextField
          label="Postage Cost in Cents"
          className='totalCostCents'
          value={postageCost}
          InputProps={{
            endAdornment: <InputAdornment position="end">¢</InputAdornment>,
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPostageCost(Number.parseInt(event.target.value) || 0);
          }}
        />
        <TextField
          label="Max # of Stamps"
          className='maxStamps'
          value={maxStamps}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMaxStamps(Number.parseInt(event.target.value) || 0);
          }}
        />
        <TextField
          label="Stamp Values Available"
          className='stampValues'
          value={stampDenominations}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setStampDenominations(event.target.value || '');
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            localStorage.setItem('stampDenominations', stampDenominations);
            generateSolutions();
          }}
          className="generateSolution"
        >
          Generate Solutions
        </Button>
      </div>
      <hr className='divider' />
      <List className='displayPostageSolution'>
        { solutions.map((sol: number[]) => (
          <ListItem key={sol.toString()} className='postageSolution'>{drawStamps(sol)}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default PostageCalculator;
