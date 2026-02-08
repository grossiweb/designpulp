import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Submit to Gravity Forms
    // Note: You may need to adjust the form ID and field IDs based on your Gravity Forms setup
    const gravityFormsUrl = 'https://headless.designpulp.net/wp-json/gf/v2/forms/1/submissions';

    const formData = {
      input_1: name,      // Adjust field IDs based on your Gravity Form
      input_2: email,
      input_3: subject || 'Contact Form Submission',
      input_4: message,
    };

    try {
      const response = await fetch(gravityFormsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        return NextResponse.json({
          success: true,
          message: 'Your message has been sent successfully!',
        });
      }
    } catch (gravityError) {
      console.error('Gravity Forms error:', gravityError);
      // Fall through to email fallback or alternative handling
    }

    // Fallback: Log the submission (in production, you might want to send an email)
    console.log('Contact form submission:', { name, email, subject, message });

    return NextResponse.json({
      success: true,
      message: 'Your message has been received. We will get back to you soon!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
