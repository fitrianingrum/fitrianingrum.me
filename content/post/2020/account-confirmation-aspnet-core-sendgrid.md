---
title: "Email Confirmation in ASP.NET Core using SendGrid"
description: "Learn the step-by-step to enable account confirmation in ASP.NET Core using SendGrid to prevent a newly registered user from logging in until their email has been confirmed."
date: 2020-11-10T08:44:09+07:00
lastmod: 2020-11-11T11:56:08+07:00
image: "https://res.cloudinary.com/phi21st/image/upload/v1619046789/fitrianingrum.me/user-authentication-freepik-20943394.jpg"
imageAuthor: "vectorjuice"
imageAuthorUrl: "https://www.freepik.com/vectorjuice"
imageSource: "www.freepik.com"
imageSourceUrl: "https://www.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_11667025.htm"
tags: ["aspnet core","sendgrid","csharp"]
categories: ["web development"]
keywords: ["aspnet core sendgrid", "asp net core sendgrid", "asp net core sendgrid email confirmation", "asp net core sendgrid account confirmation","aspnet email confirmation sendgrid"]
featured: true
---

It's a best practice to confirm the email of a newly registered user to verify that they're not impersonating someone else. 
You generally want to prevent new users from accessing or posting any data to your web application before being confirmed by email, SMS text message, or another mechanism.

This article provides the step-by-step to enable email confirmation in ASP.NET Core Web Application using SendGrid. 

## What is SendGrid?

[SendGrid](https://sendgrid.com/) is one of the most popular cloud-based email service providers. It sends transactional and marketing emails and is popular among email marketers and developers.

It was initially built as a transactional email service and then [acquired by Twilio in January 2019](https://www.twilio.com/press/releases/twilio-completes-acquisition-sendgrid), becomes Twilio SendGrid.

There are [425+ other email sending services](https://www.emailvendorselection.com/email-service-provider-list/), including [Mailgun](https://www.mailgun.com/) and [Mandrill by MailChimp](https://www.mandrill.com/), which are also popular and commonly used.
So, if you are looking for an alternative tool, you have lots to choose from. 

However, in this article, we are going to use SendGrid, because it's not only popular but also known for being reliable, easy to set up, and well-documented.

## Step-by-step: Email Confirmation using SendGrid

I am using [.NET Core 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1) and [Visual Studio 2019](https://visualstudio.microsoft.com/vs/) Community Edition.
You can also use any versions of Visual Studio 2017 (or later) that you may have.

### --- Create a Web Application with Identity

Let's create a new ASP.NET Core Web Application with Identity using Visual Studio and store user-related data using MS SQL Server Database.

**Step 1.** In **Visual Studio**, go to **File** > **New** > **Project**. After that, select **ASP.NET Core Web Application** from templates, then click the **Next** button.

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/c_scale,q_60,w_600/v1605175680/fitrianingrum.me/2020-aspnet-core-sendgrid/01-create-new-web-app.gif" 
	title="Figure 1. Creating a new ASP.NET Core Web Application project" 
	alt="Creating a new ASP.NET Core Web Application project"
	width="600"
	class="text-center" >}}

**Step 2.** In the **Configure your new project** window, give your project a name, for example, `AspNetCoreEmailConfirmationSendGrid`. 
Then, choose a folder on your computer where you'd like to save it. After that, click the **Create** button.

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/c_scale,q_auto,w_600/v1605175571/fitrianingrum.me/2020-aspnet-core-sendgrid/02-configure-project-name-location.jpg" 
	title="Figure 2. Configuring the project's name and location" 
	alt="Configuring the project's name and location"
	width="600"
	class="text-center" >}}

**Step 3.** From templates, select **Web Application (Model-View-Controller)**, and don't forget to change the **Authentication** to **Individual User Accounts**.
Leave other options as they are. When finished, click the **Create** button. Wait until the project has been created successfully.

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/c_scale,q_auto,w_600/v1605175604/fitrianingrum.me/2020-aspnet-core-sendgrid/03-mvc-project-with-identity.gif" 
	title="Figure 3. Creating an MVC project with Identity" 
	alt="Creating an MVC project with Identity"
	width="600"
	class="text-center" >}}

### --- Set up the database

**Step 4.** Go to the **Solution Explorer**, then double-click the `appsettings.json` file to open it. Modify your connection string so that it points to the correct database server.

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/c_scale,q_auto,w_600/v1605175570/fitrianingrum.me/2020-aspnet-core-sendgrid/04-appsettings.jpg" 
	title="Figure 4. Modifying the connection string" 
	alt="Modifying the connection string"
	width="600"
	class="text-center" >}}

**Step 5.** Open the **Package Manager Console** by clicking **Tools** > **NuGet Package Manager** > **Package Manager Console** in the toolbar menu.
Then, type the following command and press **Enter** to set up a new database.

```c

PM> update-database

```

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/c_scale,q_70,w_600/v1605175681/fitrianingrum.me/2020-aspnet-core-sendgrid/05-update-database.gif" 
	title="Figure 5. Setting up the database" 
	alt="Setting up the database"
	width="600"
	class="text-center" >}}

**Step 6.** Open the **SQL Server Management Studio (SSMS)** and verify that the new database has been created successfully, including the user-related tables.

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/c_scale,q_auto,w_600/v1605175570/fitrianingrum.me/2020-aspnet-core-sendgrid/06-user-related-tables.jpg" 
	title="Figure 6. User-related tables in SQL Server Database" 
	alt="User-related tables"
	width="600"
	class="text-center" >}}

### --- Scaffold the Identity code

In the steps below, we will scaffold the `RegisterConfirmation` code only. However, feel free to scaffold a few more files if you'd like to.

**Step 7.** Right-click on the project, then select **Add** > **New Scaffolded Items**. 

**Step 8.**  In the **Add New Scaffolded Item** window, select **Identity** in the left pane, then select **Identity** in the middle pane. After that, click the **Add** button. 

**Step 9.**  In the **Add Identity** window, tick this option: **Account\RegisterConfirmation**. 
Set the **Data context class** to **ApplicationDbContext** by selecting the value from the dropdown. 
Then, click the **Add** button to apply the changes.

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/c_scale,q_auto,w_600/v1605175667/fitrianingrum.me/2020-aspnet-core-sendgrid/07-scaffold-registerconfirmation.gif" 
	title="Figure 7. Scaffolding RegisterConfirmation code" 
	alt="Scaffolding RegisterConfirmation code"
	width="600"
	class="text-center" >}}

**Step 10.** Run the web application by clicking the green triangle button in the toolbar. 
Verify that you can click each menu in the navigation bar without any errors. 

You can also try to register and confirm your newly registered account.
However, at this stage, you won't receive any email when confirming your account.

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/c_scale,q_auto,w_600/v1605175610/fitrianingrum.me/2020-aspnet-core-sendgrid/08-running-the-web-app.gif" 
	title="Figure 8. Running the Web Application" 
	alt="Running the Web Application"
	width="600"
	class="text-center" >}}

### --- Configure SendGrid for Email Confirmation

Now, let's add the functionality to confirm a newly registered account by sending an email confirmation. 

**Step 11.** Open the **Package Manager Console** again, then type the following command and press **Enter**.

```c

PM> Install-Package SendGrid

```

**Step 12.** Go to SendGrid's website (https://signup.sendgrid.com/) and sign up for a new account. 
It's free, but you might need to contact their Customer Support to activate the new account. 

Skip this step if you already have a SendGrid account. 

{{< note >}}
If you have an Azure account, you can [sign up for a new SendGrid account from the Azure portal](https://docs.microsoft.com/en-us/azure/sendgrid-dotnet-how-to-send-email), which I think is more straightforward.
{{< /note >}}

**Step 13.** Sign in to your SendGrid account and [create a new API key](https://sendgrid.com/docs/ui/account-and-settings/api-keys/#creating-an-api-key). 

**Step 14.** Back to Visual Studio, create a new folder named **Services**. 

**Step 15.** Under the **Services** folder, create a new class and name it `EmailSender`.

**Step 16.** Copy and paste the following code into `EmailSender.cs` file, also:

* For line 12, replace the string `YourSendGridKey` to use the key you got from **Step 13**.
* For line 21, change the email address to use yours.

_EmailSender.cs_

{{< highlight c "linenos=table,hl_lines=12 21">}}
using Microsoft.AspNetCore.Identity.UI.Services;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace AspNetCoreEmailConfirmationSendGrid.Services
{
    public class EmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var sendGridKey = @"YourSendGridKey";
            return Execute(sendGridKey, subject, htmlMessage, email);
        }

        public Task Execute(string apiKey, string subject, string message, string email)
        {
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("youremail@domain.com", "Fitrianingrum via SendGrid"),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
            msg.AddTo(new EmailAddress(email));

            // Disable click tracking.
            // See https://sendgrid.com/docs/User_Guide/Settings/tracking.html
            msg.SetClickTracking(false, false);

            return client.SendEmailAsync(msg);
        }
    }
}

{{< /highlight >}}

**Step 17.** Open the **Startup.cs** file. In the `ConfigureServices` method, add `EmailSender` as a transient service. 

{{< highlight c "linenos=table,hl_lines=7-10">}}
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
    services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
        .AddEntityFrameworkStores<ApplicationDbContext>();

    // requires:
    // using AspNetCoreEmailConfirmationSendGrid.Services;
    // using Microsoft.AspNetCore.Identity.UI.Services;
    services.AddTransient<IEmailSender, EmailSender>();

    services.AddControllersWithViews();
    services.AddRazorPages();
}
{{< /highlight >}}

**Step 18.** Open the `RegisterConfirmation.cshtml.cs` file, which is located under `Areas/Identity/Pages/Account`. Remove the following code (line 45):

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/c_scale,q_auto,w_600/v1605175595/fitrianingrum.me/2020-aspnet-core-sendgrid/16-modify-registerconfirmation.jpg" 
	title="Figure 9. Modifying the RegisterConfirmation file" 
	alt="Modifying the RegisterConfirmation file"
	width="600"
	class="text-center" >}}

### --- Test the email confirmation 

Now, let's follow the steps below to test all the changes we made. 

**Step 19.** Run the web application.

**Step 20.** Click the **Register** menu and register a new account. 
After registering successfully, you will be asked to check your email to confirm your account. 

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/c_scale,q_auto,w_600/v1605175606/fitrianingrum.me/2020-aspnet-core-sendgrid/18-register.gif" 
	title="Figure 10. Registering a new account" 
	alt="Registering a new account"
	width="600"
	class="text-center" >}}

**Step 21.** Check your inbox. If you can't find the email, check your Spam folder, just in case it went there.

**Step 20.** Click the hyperlink to confirm your new account. 

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/c_scale,q_auto,w_600/v1605175607/fitrianingrum.me/2020-aspnet-core-sendgrid/19-check-inbox.jpg" 
	title="Figure 11. Confirming account" 
	alt="Confirming account"
	width="600"
	class="text-center" >}}

After confirming your email by clicking the hyperlink, you should be able to login successfully.

## Conclusion

Confirming users' emails helps verify that they're not impersonating someone else and prevent them from receiving unwanted emails from your application.

You've learned how to enable account confirmation in ASP.NET Core using SendGrid, which is one of the most popular email service providers.
Of course, you can use other email service providers, but SendGrid is worth checking out.
