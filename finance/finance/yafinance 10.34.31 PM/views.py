from django.http import JsonResponse
from django.urls import reverse
from django.core import serializers
from django.shortcuts import render, get_object_or_404, redirect, render_to_response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Model
from . import models
from django.shortcuts import get_list_or_404


def home(request):
    return render(request, "home.html",{
        'companies': models.Company.objects.all(),
    })

def company(request,pk):
    company= get_object_or_404(models.Company, id=pk)

    context = {

     'company': company

    }
    return render(request, "company.html", context)



def company_list(request):
    company_list= models.Company.objects.all()
    paginator = Paginator(company_list, 40) # Show 25 contacts per page
    page = request.GET.get('page')
    companies = paginator.get_page(page)

    context = {

     'companies': companies

    }
    return render(request, "company_list.html", context)




def api(request):
    # selected_company = get_object_or_404(Company, id=pk)
    # data = {
    #     "company": selected_company.openning
    # }
    # return JsonResponse({"company": selected_company.to_json()})

    company = request.GET.get('company')

    companies = models.Company.objects.all()

    data = {
        "companies": [w.to_json() for w in companies],
    }

    return JsonResponse(data)