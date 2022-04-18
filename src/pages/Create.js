import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core'; //must be destructure because it's a function
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControlLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function Create() {
  const classes = useStyles()
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState('false')
  const [detailsError, setDetailsError] = useState('false')
  const [category, setCategory] = useState('money') 

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    if (title == '') {
      setTitleError(true)
    }
    if (details == '') {
      setDetailsError(true)
    }
    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ title, details, category })
      }).then(() => history.push('/'))
    } 
  }


  return (
    <Container>
      <Typography
      variant='h6'
      color='text'
      component='h2'
      gutterBottom
      >
        create a new note
      </Typography>

      <form noValidate autoComplete='off' onSubmit={(handleSubmit)}>
        <TextField className='classes.field'
          onChange={(e) => setTitle(e.target.value)}
          label='Note Title'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          error={titleError}
        />
        <TextField className='classes.field'
          onChange={(e) => setDetails(e.target.value)}
          label='Note Title'
          variant='outlined'
          color='secondary'
          multiline
          rows={4}
          fullWidth
          required
          error={false}
        />
        
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio />} label="Work" />  
          </RadioGroup>
        </FormControl>


      <Button 
        className={classes.btn}
        onClick={() => console.log('you clicked me')}
        type='submit' color='secondary' variant='contained'
        endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>

    </Container>
  )
}
