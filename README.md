# Metric and Imperial Conversion Microservice (MicroServiceA)

This microservice provides endpoints for various metric and imperial conversion operations. It is built using Express.js.

## Communication Contract

### Requesting Data

#### Convert Metric to Imperial

**Endpoint**: `/metric-to-imperial`

**Method**: `POST`

**Request Body**:
- `grams` (required): An array of weights in grams.

**Example Request**:
```javascript
import axios from 'axios';

const response = await axios.post('http://localhost:3000/metric-to-imperial', {
    grams: [1000, 2000, 3000]
});
console.log(response.data);
```

**Example Response**:
```json
{
    "pounds": [2.20462, 4.40924, 6.61386]
}
```

#### Convert Imperial to Metric

**Endpoint**: `/imperial-to-metric`

**Method**: `POST`

**Request Body**:
- `pounds` (required): An array of weights in pounds.

**Example Request**:
```javascript
import axios from 'axios';

const response = await axios.post('http://localhost:3000/imperial-to-metric', {
    pounds: [2.20462, 4.40924, 6.61386]
});
console.log(response.data);
```

**Example Response**:
```json
{
    "grams": [1000, 2000, 3000]
}
```

#### Convert Metric to Metric

**Endpoint**: `/metric-to-metric`

**Method**: `POST`

**Request Body**:
- `grams` (required): An array of weights in grams.

**Example Request**:
```javascript
import axios from 'axios';

const response = await axios.post('http://localhost:3000/metric-to-metric', {
    grams: [1, 2, 3]
});
console.log(response.data);
```

**Example Response**:
```json
{
    "milligrams": [1000, 2000, 3000]
}
```

#### Convert Imperial to Imperial

**Endpoint**: `/imperial-to-imperial`

**Method**: `POST`

**Request Body**:
- `tablespoon` (required): An array of volumes in tablespoons.

**Example Request**:
```javascript
import axios from 'axios';

const response = await axios.post('http://localhost:3000/imperial-to-imperial', {
    tablespoon: [1, 2, 3]
});
console.log(response.data);
```

**Example Response**:
```json
{
    "teaspoons": [3, 6, 9]
}
```

### Receiving Data

The responses from the microservice are returned in JSON format. Below are the expected response structures for each endpoint:

#### Convert Metric to Imperial
```json
{
    "pounds": [2.20462, 4.40924, 6.61386]
}
```

#### Convert Imperial to Metric
```json
{
    "grams": [1000, 2000, 3000]
}
```

#### Convert Metric to Metric
```json
{
    "milligrams": [1000, 2000, 3000]
}
```

#### Convert Imperial to Imperial
```json
{
    "teaspoons": [3, 6, 9]
}
```

### UML Sequence Diagram

This is a UML sequence diagram that shows how the microservice handles data:

```
Client                           Microservice
  |                                   |
  |   POST /metric-to-imperial        |
  |---------------------------------->|
  |<--- JSON Response (Pounds) -------|
  |                                   |
  |   POST /imperial-to-metric        |
  |---------------------------------->|
  |<--- JSON Response (Grams) --------|
  |                                   |
  |   POST /metric-to-metric          |
  |---------------------------------->|
  |<--- JSON Response (Milligrams) ---|
  |                                   |
  |   POST /imperial-to-imperial      |
  |---------------------------------->|
  |<--- JSON Response (Teaspoons) ----|
  |                                   |
