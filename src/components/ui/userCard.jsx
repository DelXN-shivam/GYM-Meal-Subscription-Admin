"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Weight, 
  Home, 
  School, 
  HeartPulse, 
  Utensils, 
  ShieldCheck, 
  Calendar,
  Eye,
  X,
  Cake,
  Ruler,
  Target,
  Activity,
  Dumbbell
} from "lucide-react";

export default function UserCard({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate age from date of birth if available
  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Detail Item Component for consistent styling
  const DetailItem = ({ icon: Icon, label, value, color = "text-primary" }) => (
    <div className="flex items-start gap-2">
      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${color}`} />
      <div>
        <span className="font-medium">{label}: </span>
        <span>{value || "N/A"}</span>
      </div>
    </div>
  );

  // Section Header Component
  const SectionHeader = ({ icon: Icon, title, color = "text-primary" }) => (
    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
      <Icon className={`w-5 h-5 ${color}`} /> 
      {title}
    </h4>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="w-full max-w-sm shadow-md border-none transition-all duration-200 cursor-pointer bg-white dark:bg-zinc-900/70 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transform-gpu">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Phone className="w-3 h-3" />
                  <span>{user.contactNo}</span>
                </div>
              </div>
              
              {/* Status & Action */}
              <div className="flex flex-col items-end gap-2">
                <Badge variant="default" className="bg-green-500/90 text-white text-xs">
                  Active
                </Badge>
                <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl w-full h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <UserIcon className="w-6 h-6 text-primary" />
                User Details
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>
        
        <div className="max-w-2xl w-full">
          <ScrollArea className="max-h-[75vh] pr-4">
            <div className="space-y-6">
              {/* Header with Avatar */}
              <div className="relative">
                <div className="h-20 bg-gradient-to-r from-primary to-accent rounded-lg flex items-end justify-start">
                  <div className="absolute left-6 -bottom-6 z-10">
                  </div>
                </div>
                <div className="pt-8 pb-4 px-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                        <Phone className="w-4 h-4 text-accent" />
                        <span>{user.contactNo}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <Badge variant="default" className="bg-green-500/90 text-white">Active</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <section className="relative rounded-xl border-l-4 border-primary/80 bg-primary/5 p-4">
                <SectionHeader icon={HeartPulse} title="Personal Details" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-foreground">
                  <div className="space-y-3">
                    <DetailItem icon={UserIcon} label="Gender" value={user.gender} />
                    <DetailItem icon={Cake} label="Age" value={calculateAge(user.dateOfBirth)} />
                    <DetailItem icon={Weight} label="Weight" value={user.weight ? `${user.weight} kg` : undefined} color="text-pink-500" />
                  </div>
                  <div className="space-y-3">
                    <DetailItem icon={Ruler} label="Height" value={user.height ? `${user.height} cm` : undefined} color="text-blue-500" />
                    <DetailItem icon={Home} label="Home" value={user.homeAddress} color="text-blue-500" />
                  </div>
                </div>
              </section>

              {/* Address Details */}
              <section className="relative rounded-xl border-l-4 border-blue-500/80 bg-blue-500/5 p-4">
                <SectionHeader icon={MapPin} title="Address Details" color="text-blue-500" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-foreground">
                  <div className="space-y-3">
                    <DetailItem icon={Home} label="Home Address" value={user.homeAddress} color="text-blue-500" />
                    <DetailItem icon={MapPin} label="Office Address" value={user.officeAddress} color="text-orange-500" />
                  </div>
                  <div className="space-y-3">
                    <DetailItem icon={School} label="College Address" value={user.collegeAddress} color="text-yellow-500" />
                  </div>
                </div>
              </section>

              {/* Health Details */}
              <section className="relative rounded-xl border-l-4 border-purple-500/80 bg-purple-500/5 p-4">
                <SectionHeader icon={HeartPulse} title="Health Details" color="text-purple-500" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-foreground">
                  <div className="space-y-3">
                    {user.bmi && (
                      <DetailItem icon={Activity} label="BMI" value={user.bmi.toFixed(1)} color="text-purple-500" />
                    )}
                    
                    {user.dietPreference?.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Utensils className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-500" />
                        <div>
                          <span className="font-medium">Diet Preferences: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {user.dietPreference.map((diet, i) => (
                              <Badge key={i} className="bg-purple-500/90 text-white capitalize text-xs">
                                {diet}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {user.allergy?.length > 0 && (
                      <div className="flex items-start gap-2">
                        <HeartPulse className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                        <div>
                          <span className="font-medium">Allergies: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {user.allergy.map((allergy, i) => (
                              <Badge key={i} variant="destructive" className="capitalize text-xs">
                                {allergy}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {user.medicalConditions?.length > 0 && (
                      <div className="flex items-start gap-2">
                        <HeartPulse className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                        <div>
                          <span className="font-medium">Medical Conditions: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {user.medicalConditions.map((condition, i) => (
                              <Badge key={i} variant="destructive" className="capitalize text-xs">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Fitness Details */}
              <section className="relative rounded-xl border-l-4 border-green-500/80 bg-green-500/5 p-4">
                <SectionHeader icon={ShieldCheck} title="Fitness Details" color="text-green-500" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-foreground">
                  <div className="space-y-3">
                    <DetailItem icon={Target} label="Fitness Goal" value={user.fitnessGoal} color="text-green-500" />
                    <DetailItem icon={Activity} label="Activity Level" value={user.activityLevel} color="text-green-500" />
                  </div>
                  
                  <div className="space-y-3">
                    {user.preferredWorkoutTypes?.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Dumbbell className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                        <div>
                          <span className="font-medium">Preferred Workouts: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {user.preferredWorkoutTypes.map((workout, i) => (
                              <Badge key={i} variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300 capitalize text-xs">
                                {workout}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Meal Plan */}
              {user.mealData && (
                <section className="relative rounded-xl border-l-4 border-yellow-500/80 bg-yellow-500/5 p-4">
                  <SectionHeader icon={Utensils} title="Meal Plan" color="text-yellow-500" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-foreground">
                    <div className="space-y-3">
                      <DetailItem icon={Utensils} label="Meals per Day" value={user.mealData.mealPerDay} color="text-yellow-500" />
                      <DetailItem icon={Calendar} label="Number of Days" value={user.mealData.numberOfDays} color="text-yellow-500" />
                    </div>
                    
                    <div className="space-y-3">
                      {user.mealData.mealTypes?.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Utensils className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                          <div>
                            <span className="font-medium">Meal Types: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {user.mealData.mealTypes.map((type, i) => (
                                <Badge key={i} variant="secondary" className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 capitalize text-xs">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {user.mealData.dietaryPreference?.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Utensils className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                          <div>
                            <span className="font-medium">Dietary Preferences: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {user.mealData.dietaryPreference.map((pref, i) => (
                                <Badge key={i} variant="secondary" className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 capitalize text-xs">
                                  {pref}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {/* Subscription Details */}
              {user.subscriptions?.length > 0 && (
                <section className="relative rounded-xl border-l-4 border-indigo-500/80 bg-indigo-500/5 p-4">
                  <SectionHeader icon={Calendar} title="Subscription Details" color="text-indigo-500" />
                  
                  <div className="space-y-3">
                    {user.subscriptions.map((sub, index) => (
                      <div key={index} className="p-3 border rounded-lg bg-background/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-green-500/90 text-white">{sub.status}</Badge>
                          <span className="text-sm text-muted-foreground">
                            #{index + 1}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <DetailItem 
                            icon={Calendar} 
                            label="Start Date" 
                            value={sub.startDate ? new Date(sub.startDate).toLocaleDateString() : undefined}
                            color="text-indigo-500"
                          />
                          <DetailItem 
                            icon={Calendar} 
                            label="End Date" 
                            value={sub.endDate ? new Date(sub.endDate).toLocaleDateString() : undefined}
                            color="text-indigo-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}