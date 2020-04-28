---
title: "How to Add Contact Forms to Your Static Sites Using Formspree"
description: "Do you have a static website and wondering how to add a contact form on it? This article shows you the step-by-step on how to add a dynamic contact form to your static website easily using Formspree."
date: 2020-04-20T16:49:16+07:00
image: "https://res.cloudinary.com/phi21st/image/upload/v1587964617/fitrianingrum.me/2020_contact-form.png"
tags: ["contact form", "formspree"]
keywords: ["contact form using formspree", "formspree contact form"]
categories: ["web development"]
---

A contact form lets your visitors communicate with you privately. 
As static sites are getting more and more popular nowadays, you may have a purely static company website, personal website, or blog.

However, there are limitations to what you can achieve using static sites, especially in making it more dynamic. 
For example, to add a simple contact form, you can't add any backend code to your website.

Fortunately, there are services out there that offer simple solutions to this problem. 
To add a contact form, you can simply use [Formspree](https://formspree.io/). 
It's very straightforward to set up&mdash;you don't need any backend code, even you don't need to register to use their service. 

In this article, we will learn how to create a simple contact form using Formspree.
The final result will be similar to the [contact](/contact) form on this site, like in the following screenshot:

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/v1587518786/fitrianingrum.me/2020-example-contact-form.jpg" alt="Contact form example" >}}


{{< note >}}
When building a contact form, it's better to keep your contact form simple and to the point. 
Avoid adding unnecessary fields to make it less time consuming for your visitors to fill them out. 
For example, do you really need each of their first name, middle initial, and last name? Also, what about their company, country, and phone number? 
Some of this information might not be necessary for a contact form. 
{{< /note >}}

## Step-by-step of using Formspree

Follow the steps below to create a contact form using Formspree. 
The steps are simple and easy to follow. You can copy-paste the code snippets then modify the values in it.

**Step 1. Create an HTML form** 

Copy-paste the following code into your HTML file then change the `your@email.com` with your real email address. 
Make sure you don't change the values of **name**, **_replyto**, and **message** because Formspree will use these attribute values.

{{< highlight html "linenos=table" >}}
<form action="https://formspree.io/your@email.com" method="POST">
  <input type="text" name="name" placeholder="Your name">
  <input type="email" name="_replyto" placeholder="Your email address">
  <textarea name="message" placeholder="Your message"></textarea>
  <input type="submit" value="Send">
</form>
{{< /highlight >}}

**Step 2. Add a hidden input for the email subject**

Every submission will be coming to your email, and you can customize the email subject by adding a hidden input named `_subject`. 

{{< highlight html >}}
<input type="hidden" name="_subject" value="This is the eEmail subject" />
{{< /highlight >}}

**Step 3. Add a hidden input for custom thank you page**

You can also show a custom thank you page to be shown after someone has successfully submitted the form.
{{< highlight html >}}
<input type="hidden" name="_next" value="/path/yourthankyoupage.html">
{{< /highlight >}}

**Step 4. Add a honeypot field with the name `_gotcha` for preventing spams**

Formspree uses reCAPTCHA to identify spam submissions, but you can also add this additional technique.
The idea is to hide a field inside your form. A person won't see it because it's hidden, but spambots do. 
A spambot will fill in the field, while a person won't. 
Any submission with this field filled in will be considered spam.

{{< highlight html >}}
<input type="text" name="_gotcha" style="display:none" />
{{< /highlight >}}

**Step 5. Review the final code**

After following the four steps above, your final code will look like this:

{{< highlight html "linenos=table" >}}
<form action="https://formspree.io/your@email.com" method="POST">
  <input type="text" name="name" placeholder="Your name">
  <input type="email" name="_replyto" placeholder="Your email address">
  <textarea name="message" placeholder="Your message"></textarea>
  <input type="hidden" name="_subject" value="Email subject" />
  <input type="hidden" name="_next" value="/path/yourthankyoupage.html">
  <input type="text" name="_gotcha" style="display:none" />
  <input type="submit" value="Send">
</form>
{{< /highlight >}}

**Step 6. Checking the result**

Finally, it's time to ensure your contact form works. Fill in the fields and then submit it. 
After a few seconds, you will get an email from Formspree asking you to confirm your email address.
Accept it, and your contact form is ready to use.

