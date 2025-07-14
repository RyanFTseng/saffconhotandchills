import { useState } from 'react';

function SaffAgent() {
    const [inputText, setInputText] = useState('');
    const [submittedText, setSubmittedText] = useState('');
    const [showOutput, setShowOutput] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [apiResult, setApiResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('https://3l4gubpw4sp3lfijdhmwi3x6ue0jzkik.lambda-url.us-west-1.on.aws/agent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputText, 
                    timestamp: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            setApiResult(result);
            setSubmittedText(inputText);
            setShowOutput(true);
            setInputText('');

            // You can handle the response here
            console.log('Success:', result);

        } catch (err) {
            setError('Failed to submit: ' + err.message);
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="agent" style={{ padding: '20px', fontFamily: 'Georgia' }}>

            <div style={{
                maxWidth: '400px',
                margin: '0 auto',
                padding: '24px',
                backgroundColor: '#191616ff',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <div style={{ marginBottom: '16px' }}>
                    <label
                        htmlFor="textInput"
                        style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#ffffffff',
                            marginBottom: '8px'
                        }}
                    >
                        Enter text:
                    </label>
                    <input
                        type="text"
                        id="textInput"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter Text"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ffffffff',
                            borderRadius: '6px',
                            fontSize: '16px',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                        onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                        onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    style={{
                        width: '100%',
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        padding: '10px 16px',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#2563EB'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#3B82F6'}
                >
                    Submit
                </button>

                {showOutput && (
                    <div style={{
                        marginTop: '16px',
                        padding: '16px',
                        backgroundColor: '#394047ff',
                        borderRadius: '6px',
                        borderLeft: '4px solid #3B82F6'
                    }}>
                        <h3 style={{ fontWeight: '600', color: '#e3e9f2ff', marginBottom: '8px' }}>
                            You submitted:
                        </h3>
                        <p style={{ color: '#ddeaffff', marginBottom: '8px' }}>"{submittedText}"</p>
                        <p style={{ fontSize: '12px', color: '#e5edffff' }}>
                            Submitted at: {new Date().toLocaleString()}
                        </p>
                        <h3 style={{ fontWeight: '600', color: '#e3e9f2ff', marginBottom: '8px' }}>
                            Response:
                        </h3>
                        <p style={{ color: '#ddeaffff', marginBottom: '8px' }}>"{apiResult.response || 'Server Error'}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SaffAgent;