(function () {
    const projectSlug = document.currentScript.getAttribute('data-project');

    if (!projectSlug) {
        console.error('Reflectly: data-project attribute is required');
        return;
    }

    // Create button
    const button = document.createElement('button');
    button.id = 'reflectly-widget-button';
    button.innerHTML = '💬 Feedback';
    button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
    z-index: 9999;
    transition: all 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)';
        button.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.5)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)';
    });

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'reflectly-widget-modal';
    modal.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    align-items: center;
    justify-content: center;
  `;

    const iframe = document.createElement('iframe');
    const baseUrl = document.currentScript.src.replace('/embed.js', '');
    iframe.src = `${baseUrl}/feedback/${projectSlug}`;
    iframe.style.cssText = `
    width: 90%;
    max-width: 800px;
    height: 90%;
    max-height: 800px;
    border: none;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  `;

    modal.appendChild(iframe);

    // Toggle modal
    button.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Add to page
    document.body.appendChild(button);
    document.body.appendChild(modal);
})();
