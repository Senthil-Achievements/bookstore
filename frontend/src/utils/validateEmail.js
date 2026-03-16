import disposableDomains from 'disposable-email-domains';
import fakefilterData from 'fakefilter/json/data.json';

// Extract the domain list from fakefilter's raw JSON (avoids importing Node.js built-ins)
const fakefilterDomains = Object.keys(fakefilterData.domains);

export const validateEmailSecurity = async (email) => {
    if (!email) return { isValid: false, message: 'Email is required' };
    
    const emailParts = email.split('@');
    if (emailParts.length !== 2) return { isValid: false, message: 'Please enter a valid email format.' };

    const emailPrefix = emailParts[0];
    const emailDomain = emailParts[1].toLowerCase();

    // Frontend Security 1: Prevent "Gmail Dot Trick" Spam
    const dotCount = (emailPrefix.match(/\./g) || []).length;
    if (dotCount > 2) {
      return { isValid: false, message: 'Email rejected: Too many dots in prefix.' };
    }

    // Frontend Security 2: Prevent disposable/spam email domains (Local Lists)
    const customBlocklist = [
      'paylaar.com', 'mailinator.com', 'tempmail.com', 
      'temp-mail.org', 'temp-mail.io', 'tempmailo.com'
    ]; 
    
    // Check all static domain lists 
    const isDisposable = 
      disposableDomains.includes(emailDomain) || 
      customBlocklist.includes(emailDomain) || 
      fakefilterDomains.includes(emailDomain);
    
    if (isDisposable) {
      return { isValid: false, message: 'No disposable/temp emails allowed.' };
    }

    // Frontend Security 3: Live API Check (isTempmail)
    try {
        const tempMailApiToken = 'SvXdRLGghW8pwgsxN2bJ4iHcfLMkpu91';
        const response = await fetch(`https://istempmail.com/api/check/${tempMailApiToken}/${emailDomain}`);
        const data = await response.json();
        
        if (data && data.blocked) {
            return { isValid: false, message: 'Temporary email detected by security API.' };
        }
    } catch (error) {
        console.error("isTempmail API check failed, falling back to local list:", error);
    }

    return { isValid: true, message: 'Valid' };
}
