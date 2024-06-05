const axios = require('axios')

const baseURL = 'http://localhost:3000'

// Test data and expected responses
const tests = [
    {
        endpoint: 'metric-to-imperial',
        input: { grams: [100, 200, 300] },
        expected: { pounds: [0.220462, 0.440924, 0.661386] },
    },
    {
        endpoint: 'imperial-to-metric',
        input: { pounds: [1, 2, 3] },
        expected: { grams: [453.5929094356397, 907.1858188712794, 1360.778728306919] },
    },
    {
        endpoint: 'metric-to-metric',
        input: { grams: [1, 2, 3] },
        expected: { milligrams: [1000, 2000, 3000] },
    },
    {
        endpoint: 'imperial-to-imperial',
        input: { tablespoon: [1, 2, 3] },
        expected: { teaspoons: [3, 6, 9] },
    },
]

// Function to test endpoints
const testEndpoint = async (test) => {
    try {
        const response = await axios.post(`${baseURL}/${test.endpoint}`, test.input)
        console.log(`Testing ${test.endpoint} endpoint:`)
        console.log('Input:', test.input)
        console.log('Expected Response:', test.expected)
        console.log('Actual Response:', response.data)
        console.log('Match:', JSON.stringify(response.data) === JSON.stringify(test.expected))
        console.log('----------------------------------------------------')
    } catch (error) {
        console.error(`Error in ${test.endpoint}:`, error)
    }
}

// Run all tests
const runTests = async () => {
    for (const test of tests) {
        await testEndpoint(test)
    }
}

runTests()
