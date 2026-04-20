/**
 * Service to interact with the Segmentation & Rules API
 */

const getApiKey = () => sessionStorage.getItem('api_key') || '';

/**
 * Core request helper to handle headers and security
 */
window.apiRequest = async (url, method = 'GET', body = null) => {
    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': getApiKey()
    };

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(url, options);
        
        if (response.status === 401) {
            sessionStorage.clear();
            window.location.href = 'auth-login.html';
            return;
        }

        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Request failed for ${url}:`, error);
        throw error;
    }
};

window.fetchRules = (page = 1, limit = 20, active = true) => 
    apiRequest(`https://segmentation.gamesapi.dev/v1/rules?page=${page}&limit=${limit}&active=${active}`);

window.fetchAnalyticsSchema = () => 
    apiRequest(`https://segmentation.gamesapi.dev/v1/analytics/schema`);

window.publishRule = (ruleData) => 
    apiRequest(`https://segmentation.gamesapi.dev/v1/rules`, 'POST', ruleData);

/**
 * Creates a new customer segment with a condition-based criteria tree
 */
window.createSegment = (name, description, refreshType, criteria) => {
    const payload = {
        name,
        description,
        refresh_type: refreshType, // REAL_TIME or BATCH
        criteria: {
            operator: criteria.operator || 'AND',
            conditions: criteria.conditions.map(c => ({
                metric: c.metric,
                operator: c.operator,
                value: String(c.value) // Numeric values must be sent as strings
            }))
        }
    };
    return apiRequest(`https://segmentation.gamesapi.dev/v1/segments`, 'POST', payload);
};

window.executeAnalyticsQuery = (queryData) => 
    apiRequest(`https://segmentation.gamesapi.dev/v1/analytics/query`, 'POST', queryData);

window.fetchSegments = (page = 1, limit = 20) => 
    apiRequest(`https://segmentation.gamesapi.dev/v1/segments?page=${page}&limit=${limit}`);
