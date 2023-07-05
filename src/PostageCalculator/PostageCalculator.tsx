import React, { useState } from 'react';
import { InputAdornment, TextField, List, ListItem, Button } from '@mui/material';
import './PostageCalculator.css';

function PostageCalculator() {

  const stampDenominations = [4, 5, 10, 18, 20, 22, 24, 29, 33, 34, 50, 51, 66, 87, 100, 111];
  const [postageCost, setPostageCost] = useState(51);
  const [maxStamps, setMaxStamps] = useState(4);
  const [solutions, setSolutions] = useState(new Array());

  const generateSolutions = () => {
    let sols = [];
    
    for (let x = stampDenominations.length - 1; x >= 0; x--) {
      const current = stampDenominations[x];
      if (current < postageCost) {
        const sol = generateIndividualSolution([current], postageCost - current, stampDenominations.slice(0, x + 2));
        if (sol.length > 0) {
          sols.push(sol.sort((a: number, b: number) => a - b));
        }
      } else if (current === postageCost) {
        sols.push([current]);
      }
    }

    setSolutions(sols);
  };

  const generateIndividualSolution = (stamps: number[], remainingAmount: number, remainingStamps: number[]): any => {
    if (remainingAmount === 0) {
      return stamps;
    } else if (remainingAmount < remainingStamps[0]) {
      return [];
    } else if (stamps.length >= 4) {
      return [];
    }

    let tempSolutions = [];
    for (let x = remainingStamps.length - 1; x >= 0; x--) {
      const current = remainingStamps[x];
      if (current > remainingAmount) {
        continue;
      }

      const sol = generateIndividualSolution([current, ...stamps], remainingAmount - current, remainingStamps.splice(0, x + 2));
      if (sol.length > 0) {
        tempSolutions.push(sol);
      }
    }

    return tempSolutions;
  };

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
        <Button
          variant="contained"
          onClick={() => generateSolutions()}
          className="generateSolution"
        >
          Generate Solutions
        </Button>
      </div>
      <hr />
      <List>
        { solutions.map((sol: Number[]) => (
          <ListItem key={sol.toString()} className='taskItem'>{sol.toString()}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default PostageCalculator;
